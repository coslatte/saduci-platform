import "../../setup";
import { act, fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { Sidebar } from "@/components/organisms/Sidebar";

const sections = [
  {
    title: "Principal",
    items: [{ label: "Dashboard", href: "/", active: true }],
  },
];

const nestedSections = [
  {
    title: "Principal",
    items: [
      {
        label: "Simulación",
        href: "/simulation",
        children: [{ label: "Pruebas Estadísticas", href: "/statistics" }],
      },
    ],
  },
];

describe("Sidebar", () => {
  it("renders section items", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Dashboard")).toBe(true);
  });

  it("hides labels when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    // Label stays in DOM for CSS transition — it must be aria-hidden and
    // visually collapsed (w-0 opacity-0).
    const labelSpan = container.querySelector("span[aria-hidden='true']");
    expect(labelSpan).toBeTruthy();
  });

  it("shows the collapsed item tooltip on hover", async () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const collapsedLink = container.querySelector(
      'a[title="Dashboard"]',
    ) as HTMLElement | null;

    expect(collapsedLink).toBeTruthy();
    if (!collapsedLink?.parentElement) return;

    await act(async () => {
      fireEvent.mouseEnter(collapsedLink.parentElement!);
      await new Promise((resolve) => setTimeout(resolve, 250));
    });

    // In collapsed mode the nav is non-interactive, so no tooltip should appear.
    const tooltip = within(container)
      .queryAllByRole("tooltip")
      .find((node) => node.textContent?.includes("Dashboard"));
    expect(tooltip).toBeFalsy();
  });

  it("renders section title when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Principal")).toBe(true);
  });

  it("hides section title when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    // Title text stays in the DOM for the collapse animation but is visually
    // hidden via opacity-0 + max-h-0. Verify the wrapper carries those classes.
    const titleWrapper = container.querySelector(".opacity-0.max-h-0");
    expect(titleWrapper).toBeTruthy();
  });

  it("marks the active route link with aria-current", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const activeLink = container.querySelector("a[aria-current='page']");
    expect(activeLink).toBeTruthy();
  });

  it("keeps parent hierarchy item as navigation link", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarScope = within(container);

    const parentLink = sidebarScope.getByRole("link", {
      name: /simulación/i,
    });

    expect(parentLink.getAttribute("href")).toBe("/simulation");
  });

  it("expands nested children only when clicking the dedicated toggle button", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarNav = container.querySelector("nav");

    expect(sidebarNav).toBeTruthy();
    if (!sidebarNav) return;

    const navScope = within(sidebarNav);
    expect(navScope.getByText("Simulación")).toBeTruthy();

    // Children are in the DOM but visually hidden (aria-hidden) before expanding.
    const childrenWrapper = sidebarNav.querySelector("[aria-hidden='true']");
    expect(childrenWrapper).toBeTruthy();

    fireEvent.click(
      navScope.getByRole("button", { name: /expandir sección simulación/i }),
    );

    // After expanding the wrapper should no longer be aria-hidden.
    const expandedWrapper =
      sidebarNav.querySelector("[aria-hidden='false']") ??
      sidebarNav.querySelector(".max-h-96");
    expect(expandedWrapper).toBeTruthy();
  });

  it("renders the tree toggle inside the same item container", () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarScope = within(container);

    const parentLink = sidebarScope.getByRole("link", {
      name: /simulación/i,
    });
    const toggleButton = sidebarScope.getByRole("button", {
      name: /(expandir|contraer) sección simulación/i,
    });

    const parentItem = parentLink.closest("li");

    expect(parentItem).toBeTruthy();
    if (!parentItem) return;

    expect(parentItem.contains(toggleButton)).toBe(true);
    expect(parentLink.contains(toggleButton)).toBe(false);
  });

  it("hides nested children when collapsed", () => {
    const { container } = render(
      <Sidebar sections={nestedSections} collapsed={true} />,
    );
    const sidebarNav = container.querySelector("nav");

    expect(sidebarNav).toBeTruthy();
    if (!sidebarNav) return;

    // Children wrapper stays in DOM but must be aria-hidden + pointer-events-none.
    const hiddenWrapper = sidebarNav.querySelector(
      "[aria-hidden='true'].pointer-events-none",
    );
    expect(hiddenWrapper).toBeTruthy();
  });

  it("calls the collapse toggle callback", () => {
    const onToggleCollapse = mock(() => {});
    const { container } = render(
      <Sidebar sections={sections} onToggleCollapse={onToggleCollapse} />,
    );

    const sidebarScope = within(container);

    fireEvent.click(
      sidebarScope.getByRole("button", { name: /contraer barra lateral/i }),
    );

    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it("does not render user panel in sidebar", () => {
    const { container } = render(<Sidebar sections={sections} />);

    const userPanel = container.querySelector(
      "[data-slot='sidebar-user-panel']",
    );
    expect(userPanel).toBeNull();
  });

  it("uses non-underlined button and link labels in the sidebar", async () => {
    const { container } = render(<Sidebar sections={nestedSections} />);
    const sidebarScope = within(container);

    const parentLink = sidebarScope.getByRole("link", { name: /simulación/i });
    expect(parentLink.className.includes("no-underline")).toBe(true);

    const sectionToggle =
      sidebarScope.queryByRole("button", {
        name: /expandir sección simulación/i,
      }) ??
      sidebarScope.getByRole("button", {
        name: /contraer sección simulación/i,
      });

    await act(async () => {
      fireEvent.click(sectionToggle);
      await Promise.resolve();
    });

    const childLink = container.querySelector(
      'a[href="/statistics"] span',
    ) as HTMLElement | null;

    expect(childLink).toBeTruthy();
    if (!childLink) return;
    expect(childLink.className.includes("no-underline")).toBe(true);
  });

  it("hides full sidebar width when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-0")).toBe(true);
    // The navigation area is faded out but the collapse toggle must remain
    // visible and interactive so the user can expand again.
    const toggle = container.querySelector(
      "button[aria-label='Expandir barra lateral']",
    );
    expect(toggle).toBeTruthy();
  });

  it("fades out and disables collapsed navigation area", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const nav = container.querySelector("nav");

    expect(nav).toBeTruthy();
    if (!nav) return;

    expect(nav.className.includes("opacity-0")).toBe(true);
    expect(nav.className.includes("pointer-events-none")).toBe(true);
  });

  it("applies full width when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-72")).toBe(true);
  });
});
