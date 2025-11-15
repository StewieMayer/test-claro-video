import { cleanup, render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

// Simula la fecha actual y asegurar que el año sea constante en el test
const MOCK_YEAR = 2025;
global.Date = class MockDate extends Date {
  constructor(date: string | number | undefined) {
    if (date) {
      super(date);
    } else {
      super(MOCK_YEAR.toString());
    }
  }

  getFullYear() {
    return MOCK_YEAR;
  }
} as typeof Date;

describe("Footer", () => {
  beforeEach(cleanup);

  test("should display the correct copyright notice with the current year", () => {
    render(<Footer />);

    const expectedText = `© ${MOCK_YEAR} Antonio Amaya.`;

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("should render the GitHub link with correct attributes", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/StewieMayer"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("should render the LinkedIn link with correct attributes", () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/antonioamayastc/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  test("should render the Contacto link with mailto scheme", () => {
    render(<Footer />);

    const contactLink = screen.getByRole("link", { name: /contacto/i });

    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute(
      "href",
      "mailto:stewiemayer@hotmail.com"
    );
  });

  test("should render the component using semantic footer tag", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
