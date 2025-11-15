import { cleanup, render, screen } from "@testing-library/react";
import Layout from "../components/Layout";

jest.mock("../components/Header", () => {
  return () => <header role="banner">Mock Header</header>;
});

jest.mock("../components/Footer", () => {
  return () => <footer role="contentinfo">Mock Footer</footer>;
});

describe("Layout", () => {
  beforeEach(cleanup);

  const TestChildren = () => (
    <div data-test-id="test-content">Contenido de la Página</div>
  );

  test("should render Header, Footer, and children content using ARIA roles", () => {
    render(
      <Layout>
        <TestChildren />
      </Layout>
    );

    const childrenElement = screen.getByTestId("test-content");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
  });

  test("should place children content inside the main tag", () => {
    render(
      <Layout>
        <TestChildren />
      </Layout>
    );

    const mainElement = screen.getByRole("main");
    const childrenElement = screen.getByTestId("test-content");

    expect(mainElement).toContainElement(childrenElement);
  });
});
