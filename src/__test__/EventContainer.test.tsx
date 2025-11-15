import { render, screen, fireEvent } from '@testing-library/react';
import { EventContainer } from '../pages/epg/components/eventcontainer/EventContainer';
import { Event } from '@/types/channelTypes';

const mockEvent: Event = {
  name: 'Las locas aventuras de Stewie Mayer',
  description: 'Acompaña a Stewie en sus locas aventuras desarrollando react apps. Hay que conseguir el empleo en Claro video Goku!',
  duration:"01:00:00",
  date_begin:"2025/11/13 10:00:00",
  date_end:"2025/11/13 11:00:00",
  ext_eventimage_name_base: 'https://images.claro.com/stewie_mayer.jpg',
};

const mockUseEventContainer = jest.fn();
jest.mock('../pages/epg/components/eventcontainer/hooks/useEventContainer', () => ({
  useEventContainer: (event: Event) => mockUseEventContainer(event),
}));

const MOCK_WIDTH = '250px';
const mockHandleSetEvent = jest.fn();
const mockSchedule = '10:00-11:00';

const setupHookMock = () => {
  mockUseEventContainer.mockReturnValue({
    width: MOCK_WIDTH,
    handleSetEvent: mockHandleSetEvent,
    schedule: mockSchedule,
  });
};


describe('EventContainer', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    setupHookMock();
  });

  test('should display the event name and schedule fetched from hook', () => {
    render(<EventContainer event={mockEvent} />);

    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(screen.getByText(mockSchedule)).toBeInTheDocument();
  });

  test('should apply the dynamic width from the hook to the container', () => {
    render(<EventContainer event={mockEvent} />);

    const containerElement = screen.getByText(mockEvent.name).closest('div');

    expect(containerElement).toHaveStyle(`min-width: ${MOCK_WIDTH}`);
  });

  test('should call handleSetEvent when the container is clicked', () => {
    render(<EventContainer event={mockEvent} />);

    const containerElement = screen.getByText(mockEvent.name).closest('div');

    fireEvent.click(containerElement!);

    expect(mockHandleSetEvent).toHaveBeenCalledTimes(1);
  });
});