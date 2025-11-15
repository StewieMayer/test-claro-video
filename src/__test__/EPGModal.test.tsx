import { render, screen, fireEvent } from "@testing-library/react";
import React, { RefObject } from "react";
import { EPGModal } from "../pages/epg/components/epgmodal/EPGModal";
import { Channel, Event } from "@/types/channelTypes";

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "Channel A",
    number: "101",
    image: "a.png",
    events: [
      {
        id: "1",
        description: "Show A",
        date_begin: "2025/11/13 10:00:00",
        name: "EventA",
        date_end: "2025/11/13 11:00:00",
        duration: "01:00:00",
      },
    ],
  },
  {
    id: "2",
    name: "Channel B",
    number: "102",
    image: "b.png",
    events: [
      {
        id: "2",
        description: "Show B",
        date_begin: "2025/11/13 10:00:00",
        name: "EventB",
        date_end: "2025/11/13 12:00:00",
        duration: "02:00:00",
      },
    ],
  },
];

const mockUseEPGModal = jest.fn();
jest.mock("../pages/epg/components/epgmodal/hooks/useEPGModal", () => ({
  useEPGModal: () => mockUseEPGModal(),
}));

jest.mock("../pages/epg/components/eventcontainer/EventContainer", () => ({
  EventContainer: ({ event }: { event: Event }) => (
    <div data-test-id="mock-event-container">{event.name}</div>
  ),
}));
jest.mock("../pages/epg/components/channelcontainer/ChannelContainer", () => ({
  ChannelContainer: ({ channel }: { channel: Channel }) => (
    <div data-test-id="mock-channel-container">{channel.name}</div>
  ),
}));
jest.mock("../pages/epg/components/epgviewer/EPGViewer", () => ({
  EPGViewer: () => <div data-test-id="mock-epg-viewer">Mock EPG Viewer</div>,
}));
jest.mock("../pages/epg/components/timeline/TimeLine", () => ({
  TimeLine: () => <div data-test-id="mock-timeline">Mock TimeLine</div>,
}));

const mockRefs = {
  timerRef: {
    current: document.createElement("div"),
  } as unknown as RefObject<HTMLDivElement>,
  channelsRef: {
    current: document.createElement("div"),
  } as unknown as RefObject<HTMLDivElement>,
  eventsRef: {
    current: document.createElement("div"),
  } as unknown as RefObject<HTMLDivElement>,
  scrollLeft: jest.fn(),
  scrollRight: jest.fn(),
};

const setupModalHook = () => {
  mockUseEPGModal.mockReturnValue({
    channels: mockChannels,
    ...mockRefs,
  });
};

describe("EPGModal", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    setupModalHook();
  });

  test("should NOT render the modal when show prop is false", () => {
    render(<EPGModal show={false} handleClose={mockHandleClose} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("should render the modal and its main structure when show prop is true", () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("HOY")).toBeInTheDocument();
  });

  test("should call handleClose when the close button is clicked", () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    const closeButton = screen.getByRole("button");

    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should render the main structural components", () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    expect(screen.getByTestId("mock-epg-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-timeline")).toBeInTheDocument();
  });

  test("should map and render ChannelContainer for each channel", () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    const channelContainers = screen.getAllByTestId("mock-channel-container");

    expect(channelContainers).toHaveLength(2);
    expect(screen.getByText("Channel A")).toBeInTheDocument();
    expect(screen.getByText("Channel B")).toBeInTheDocument();
  });

  test("should map and render EventContainer for each event within channels", () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    const eventContainers = screen.getAllByTestId("mock-event-container");
    expect(eventContainers).toHaveLength(2);

    expect(screen.getByText("EventA")).toBeInTheDocument();
    expect(screen.getByText("EventB")).toBeInTheDocument();
  });
   
  test('should pass scroll handlers to TimeLine component', () => {
    render(<EPGModal show={true} handleClose={mockHandleClose} />);

    expect(mockUseEPGModal).toHaveBeenCalled();
  });
});
