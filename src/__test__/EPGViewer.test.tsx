import { render, screen } from '@testing-library/react';
import { EPGViewer } from '../pages/epg/components/epgviewer/EPGViewer';
import { Event } from '@/types/channelTypes';


const mockActiveEvent: Event = {
  name: 'Las locas aventuras de Stewie Mayer',
  description: 'Acompaña a Stewie en sus locas aventuras desarrollando react apps. Hay que conseguir el empleo en Claro video Goku!',
  duration:"01:00:00",
  date_begin:"2025/11/13 10:00:00",
  date_end:"2025/11/13 11:00:00",
  ext_eventimage_name_base: 'https://images.claro.com/stewie_mayer.jpg',
};

const mockSchedule = '10.00hrs a 11:00hrs 1h 0min';

const mockUseEPGViewer = jest.fn();
jest.mock('../pages/epg/components/epgviewer/hooks/useEPGViewer', () => ({
  useEPGViewer: () => mockUseEPGViewer(),
}));


describe('EPGViewer', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('should render event details and image when activeEvent is present', () => {
    
    mockUseEPGViewer.mockReturnValue({
      activeEvent: mockActiveEvent,
      schedule: mockSchedule,
    });
    
    render(<EPGViewer />);

    const titleElement = screen.getByRole('heading', { name: mockActiveEvent.name });
    const imageElement = screen.getByRole('img', { name: mockActiveEvent.name });
    
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText(mockSchedule)).toBeInTheDocument();

    if(typeof mockActiveEvent.description =='string')
    expect(screen.getByText(mockActiveEvent.description)).toBeInTheDocument();

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockActiveEvent.ext_eventimage_name_base);
  });

  test('should render event details but NOT the image when image source is null/undefined', () => {
    
    const eventWithoutImage = { ...mockActiveEvent, ext_eventimage_name_base: '' };
    
    mockUseEPGViewer.mockReturnValue({
      activeEvent: eventWithoutImage,
      schedule: mockSchedule,
    });
    
    render(<EPGViewer />);

    const imageElement = screen.queryByRole('img', { name: eventWithoutImage.name });

    expect(screen.getByRole('heading', { name: eventWithoutImage.name })).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument();
  });

  test('should NOT render any active event details when activeEvent is null', () => {
    
    mockUseEPGViewer.mockReturnValue({
      activeEvent: null,
      schedule: mockSchedule,
    });

    render(<EPGViewer />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(mockSchedule)).not.toBeInTheDocument();
  });
});