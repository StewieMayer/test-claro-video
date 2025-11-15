import { cleanup, render, screen } from "@testing-library/react";
import { Spinner } from "../components/Spinner";

describe("Spinner", () => {
  beforeEach(cleanup);

  test("should render the spinner when show prop is true", () => {
    render(<Spinner show={true} />);

    const spinnerElement = screen.getByRole("status");

    expect(spinnerElement).toBeInTheDocument();
  });

  test("should NOT render the spinner when show prop is false", () => {
    render(<Spinner show={false} />);

    const spinnerElement = screen.queryByRole("status");

    expect(spinnerElement).not.toBeInTheDocument();
  });
});
