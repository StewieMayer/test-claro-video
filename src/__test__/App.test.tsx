import { cleanup, render, screen } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import App from "../App";

jest.mock("../components/Layout", () => {
  return ({ children }: PropsWithChildren) => (
    <div data-test-id="mock-layout">
      <header>Mock Header</header>
      <main>{children}</main>
      <footer>Mock Footer</footer>
    </div>
  );
});

jest.mock("../pages/epg/EPGPage", () => ({
  EPGPage: () => (
    <div data-test-id="mock-epg-page">Contenido de la EPG Page</div>
  ),
}));

describe("App", () => {
  beforeEach(cleanup);

  test("should render without crashing", () => {
    render(<App />);

    expect(screen.getByTestId("mock-layout")).toBeInTheDocument();
  });

  test("should render EPGPage component nested within Layout", () => {
    render(<App />);

    const epgPageContent = screen.getByTestId("mock-epg-page");
    const layoutElement = screen.getByTestId("mock-layout");

    expect(epgPageContent).toBeInTheDocument();
    expect(layoutElement).toContainElement(epgPageContent);
  });
});
