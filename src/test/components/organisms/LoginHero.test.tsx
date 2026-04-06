/* eslint-disable @next/next/no-img-element */

import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

type ImageMockProps = {
  src: string;
  alt?: string;
  className?: string;
};

mock.module("next/image", () => ({
  default: (props: ImageMockProps) => (
    <img src={props.src} alt={props.alt ?? ""} className={props.className} />
  ),
}));

import LoginHero from "@/app/login/components/LoginHero";

describe("LoginHero", () => {
  it("renders a large decorative image panel", () => {
    const { container } = render(<LoginHero className="custom-hero" />);

    const figure = container.querySelector("figure");
    expect(figure).toBeTruthy();
    expect(figure?.getAttribute("aria-hidden")).toBe("true");
    expect(figure?.className.includes("relative")).toBe(true);
    expect(figure?.className.includes("aspect-4/3")).toBe(true);
    expect(figure?.className.includes("custom-hero")).toBe(true);

    const image = container.querySelector("img");
    expect(image).toBeTruthy();
    expect(image?.getAttribute("src")).toBe("/pics/login-welcome.jpg");
    expect(image?.getAttribute("alt")).toBe("");
    expect(image?.className.includes("object-cover")).toBe(true);
  });
});
