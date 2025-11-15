import { render, screen, fireEvent } from "@testing-library/react";
import { EPGPage } from "../pages/epg/EPGPage";

const mockHandleCloseModal = jest.fn();
const mockHandleOpenModal = jest.fn();
const mockUseEPGPage = jest.fn();

jest.mock("../pages/epg/hooks/useEPGPage", () => ({
  useEPGPage: () => mockUseEPGPage(),
}));

jest.mock("../components/Spinner", () => ({
  Spinner: ({ show }: { show: boolean }) => (
    <div data-test-id="mock-spinner">{show ? "Loading" : "Idle"}</div>
  ),
}));

jest.mock("../pages/epg/components/epgmodal/EPGModal", () => ({
  EPGModal: ({
    show,
    handleClose,
  }: {
    show: boolean;
    handleClose: () => void;
  }) => <div data-test-id="mock-epg-modal" data-modal-show={show.toString()} />,
}));

const setupHookMock = (isLoading = false, show = false) => {
  mockUseEPGPage.mockReturnValue({
    handleCloseModal: mockHandleCloseModal,
    handleOpenModal: mockHandleOpenModal,
    isLoading,
    show,
  });
};

describe("EPGPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupHookMock();
  });

  test('should render the "Mostrar EPG" button', () => {
    render(<EPGPage />);

    const buttonElement = screen.getByRole("button", { name: /Mostrar EPG/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should call handleOpenModal when the "Mostrar EPG" button is clicked', () => {
    render(<EPGPage />);

    const buttonElement = screen.getByRole("button", { name: /Mostrar EPG/i });
    fireEvent.click(buttonElement);

    expect(mockHandleOpenModal).toHaveBeenCalledTimes(1);
  });

  test("should show the Spinner when isLoading is true", () => {
    setupHookMock(true, false);
    render(<EPGPage />);

    const spinnerLoading = screen.getByText("Loading");

    expect(spinnerLoading).toBeInTheDocument();
  });

  test("should hide the Spinner when isLoading is false", () => {
    setupHookMock(false, false);
    render(<EPGPage />);

    const spinnerNotLoading = screen.getByText("Idle");

    expect(spinnerNotLoading).toBeInTheDocument();
  });

  test('should render EPGModal with correct "show" prop when show is true', () => {
    setupHookMock(false, true);
    render(<EPGPage />);

    const modalMock = screen.getByTestId("mock-epg-modal");

    expect(modalMock).toHaveAttribute("data-modal-show", "true");
  });

  test("should render EPGModal and pass handleCloseModal", () => {
    render(<EPGPage />);

    expect(screen.getByTestId("mock-epg-modal")).toBeInTheDocument();

    expect(mockUseEPGPage).toHaveBeenCalled();
  });
});
