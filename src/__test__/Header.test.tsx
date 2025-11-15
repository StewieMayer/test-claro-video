import { cleanup, render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  beforeEach(cleanup);

  test("should render the component using semantic header tag", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test('should display the main title "Claro Video EPG"', () => {
    render(<Header />);

    const titleElement = screen.getByRole("heading", {
      name: /claro video epg/i,
      level: 1,
    });

    expect(titleElement).toBeInTheDocument();
  });

  test("should render the title as an h1 element", () => {
    render(<Header />);

    const titleElement = screen.getByText("Claro Video EPG");

    expect(titleElement.tagName).toBe("H1");
  });
});
