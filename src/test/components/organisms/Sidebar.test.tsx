import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Sidebar } from "@/components/organisms/Sidebar";

const sections = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", href: "/", active: true },
      { label: "Reportes", href: "/reportes" },
    ],
  },
];

describe("Sidebar", () => {
  it("renders section items", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByText("Reportes")).toBeTruthy();
  });

  it("hides labels when collapsed", () => {
    const { queryByText } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(queryByText("Dashboard")).toBeNull();
  });

  it("renders section title when not collapsed", () => {
    const { getByText } = render(<Sidebar sections={sections} />);
    expect(getByText("Principal")).toBeTruthy();
  });

  it("hides section title when collapsed", () => {
    const { queryByText } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(queryByText("Principal")).toBeNull();
  });
});
