"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutside";
import { appendClass } from "@/styles/classes";
import type { Option } from "@/types";
import { placeMenu } from "@/utils/position";
import { matchesQuery } from "@/utils/search";
import { dropdownStyles as s } from "./styles";

/** First render, before the menu is placed: invisible but still focusable (visibility:hidden isn't). */
const MEASURING: CSSProperties = { opacity: 0, left: 0, top: 0 };

export interface DropdownProps<T extends string> {
  /** Accessible name of the control. */
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  /**
   * "filter": toolbar filter, turns yellow while anything but the first ("All …") option is picked.
   * "field": form input, same look as TextField.
   */
  variant?: "filter" | "field";
  /** Leading icon on the trigger; defaults to the selected option's icon. */
  icon?: ReactNode;
  /** Shown while nothing is selected. */
  placeholder?: string;
  /** Adds a search box to the top of the list (for long lists: customers, technicians). */
  searchable?: boolean;
  id?: string;
  className?: string;
}

/**
 * The one brand select used across the app (filters, form fields, the status pill).
 * Keyboard: ↑/↓, Home/End, Enter, Esc; with `searchable`, typing filters the list.
 * The list renders into the open <dialog> or <body>, so clipped cards can't cut it off,
 * and opens upwards when there's no room below.
 */
export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  variant = "filter",
  icon,
  placeholder = "Select…",
  searchable,
  id,
  className,
}: DropdownProps<T>) {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState<CSSProperties | null>(null);
  const [container, setContainer] = useState<Element | null>(null);

  const selected = options.find((o) => o.value === value);
  const isFiltered = variant === "filter" && value !== options[0]?.value;
  const visible = searchable ? options.filter((o) => matchesQuery([o.label, o.hint], query)) : options;
  const triggerIcon = icon ?? selected?.icon;

  const openMenu = () => {
    setQuery("");
    setActive(Math.max(options.findIndex((o) => o.value === value), 0));
    setPosition(null);
    // Inside a modal <dialog>, <body> sits under the dialog's top layer, so render into the dialog.
    setContainer(triggerRef.current?.closest("dialog") ?? document.body);
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };
  const choose = (option: Option<T> | undefined) => {
    if (!option) return;
    onChange(option.value);
    close();
  };

  // Place the menu once it has rendered (its width is needed), and keep it attached on scroll/resize.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => setPosition(placeMenu(triggerRef.current!.getBoundingClientRect(), menuRef.current?.offsetWidth ?? 0));
    place();
    (searchRef.current ?? menuRef.current?.querySelector<HTMLElement>("[role=listbox]"))?.focus();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  // Keep the keyboard-highlighted option in view.
  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  useClickOutside(open, [menuRef, triggerRef], () => close(false));

  const onMenuKeyDown = (e: KeyboardEvent) => {
    const last = visible.length - 1;
    const typing = e.target === searchRef.current; // let the search box keep Space/Home/End
    const keys: Record<string, (() => void) | undefined> = {
      ArrowDown: () => setActive((i) => Math.min(i + 1, last)),
      ArrowUp: () => setActive((i) => Math.max(i - 1, 0)),
      Home: typing ? undefined : () => setActive(0),
      End: typing ? undefined : () => setActive(last),
      Enter: () => choose(visible[active]),
      " ": typing ? undefined : () => choose(visible[active]),
      Escape: () => close(),
      Tab: () => close(),
    };
    const action = keys[e.key];
    if (!action) return;
    e.preventDefault();
    e.stopPropagation(); // Esc closes the menu, not the dialog around it
    action();
  };

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(e) => (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), openMenu())}
        className={appendClass(s.trigger, s.variant[variant], isFiltered && s.triggerActive, className)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${selected?.label ?? placeholder}`}
      >
        {triggerIcon && <span className={appendClass(s.icon, isFiltered && s.iconActive)}>{triggerIcon}</span>}
        <span className={appendClass(s.value, !selected && s.placeholder)}>
          {selected?.label ?? placeholder}
          {selected?.hint && <span className={s.hint}>{selected.hint}</span>}
        </span>
        <ChevronDown size={16} className={appendClass(s.chevron, open && s.chevronOpen)} aria-hidden />
      </button>

      {open &&
        container &&
        createPortal(
          <div
            ref={menuRef}
            className={s.menu}
            style={position ?? MEASURING}
            onKeyDown={onMenuKeyDown}
          >
            {searchable && (
              <div className={s.search}>
                <Search size={15} className={s.searchIcon} aria-hidden />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder={`Search ${label.toLowerCase()}…`}
                  aria-label={`Search ${label.toLowerCase()}`}
                  aria-controls={listId}
                  aria-activedescendant={visible.length ? `${listId}-${active}` : undefined}
                  className={s.searchInput}
                />
              </div>
            )}
            <ul
              id={listId}
              role="listbox"
              tabIndex={-1}
              aria-label={label}
              aria-activedescendant={visible.length ? `${listId}-${active}` : undefined}
              className={s.list}
            >
              {visible.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => choose(option)}
                    className={appendClass(s.option, index === active && s.optionActive, isSelected && s.optionSelected)}
                  >
                    {option.icon}
                    <span className={s.optionLabel}>
                      {option.label}
                      {option.hint && <span className={s.hint}>{option.hint}</span>}
                    </span>
                    {option.count !== undefined && <span className={s.count}>{option.count}</span>}
                    <span className={s.check}>{isSelected && <Check size={14} strokeWidth={2.5} aria-hidden />}</span>
                  </li>
                );
              })}
              {visible.length === 0 && <li className={s.empty}>No matches for “{query}”</li>}
            </ul>
          </div>,
          container,
        )}
    </>
  );
}
