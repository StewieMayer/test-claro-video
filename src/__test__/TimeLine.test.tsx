import { render, screen, fireEvent } from "@testing-library/react";
import { Ref } from "react";
import { TimeLine } from "../pages/epg/components/timeline/TimeLine";

const mockHoursArr = [
  { hour: "10:00", width: "200px" },
  { hour: "10:30", width: "300px" },
  { hour: "11:00", width: "150px" },
];

const mockUseTimeLine = jest.fn();
jest.mock("../pages/epg/components/timeline/hooks/useTimeLine", () => ({
  useTimeLine: () => mockUseTimeLine(),
}));

const setupHookMock = () => {
  mockUseTimeLine.mockReturnValue({
    hoursArr: mockHoursArr,
  });
};

const mockScrollLeft = jest.fn();
const mockScrollRight = jest.fn();
const mockRef: Ref<HTMLDivElement> = { current: null };

describe("TimeLine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupHookMock();
  });

  test("should render all hours provided by the useTimeLine hook", () => {
    render(
      <TimeLine
        ref={mockRef}
        scrollLeft={mockScrollLeft}
        scrollRight={mockScrollRight}
      />
    );

    const renderedHours = screen.getAllByText(/:\d{2}/);

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("10:30")).toBeInTheDocument();
    expect(screen.getByText("11:00")).toBeInTheDocument();
    expect(renderedHours).toHaveLength(mockHoursArr.length);
  });

  test("should apply the dynamic width style to each hour element", () => {
    render(
      <TimeLine
        ref={mockRef}
        scrollLeft={mockScrollLeft}
        scrollRight={mockScrollRight}
      />
    );

    const hour1 = screen.getByText("10:00");
    const hour2 = screen.getByText("10:30");

    expect(hour1).toHaveStyle(`min-width: ${mockHoursArr[0].width}`);
    expect(hour2).toHaveStyle(`min-width: ${mockHoursArr[1].width}`);
  });

  test("should call scrollLeft function when the left chevron button is clicked", () => {
    render(
      <TimeLine
        ref={mockRef}
        scrollLeft={mockScrollLeft}
        scrollRight={mockScrollRight}
      />
    );

    const leftButton = screen.getByTestId("scroll-left");

    fireEvent.click(leftButton);

    expect(mockScrollLeft).toHaveBeenCalledTimes(1);
    expect(mockScrollRight).not.toHaveBeenCalled();
  });

  test("should call scrollRight function when the right chevron button is clicked", () => {
    render(
      <TimeLine
        ref={mockRef}
        scrollLeft={mockScrollLeft}
        scrollRight={mockScrollRight}
      />
    );

    const rightButton = screen.getByTestId("scroll-right");

    fireEvent.click(rightButton);

    expect(mockScrollRight).toHaveBeenCalledTimes(1);
    expect(mockScrollLeft).not.toHaveBeenCalled();
  });
});
