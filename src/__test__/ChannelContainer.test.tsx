import { cleanup, render, screen } from "@testing-library/react";
import { ChannelContainer } from "../pages/epg/components/channelcontainer/ChannelContainer";
import { Channel } from "@/types/channelTypes";

const mockChannel: Channel = {
  id: "1",
  number: "105",
  name: "Canal de Prueba HD",
  image: "/logos/canal_prueba.png",
  events: [],
};

describe("ChannelContainer", () => {
  beforeEach(cleanup);

  test("should display the correct channel number", () => {
    render(<ChannelContainer channel={mockChannel} />);

    expect(
      screen.getByText(mockChannel.number, { exact: false })
    ).toBeInTheDocument();
  });

  test("should render the channel image with correct src and alt attributes", () => {
    render(<ChannelContainer channel={mockChannel} />);

    const channelImage = screen.getByRole("img", { name: mockChannel.name });

    expect(channelImage).toBeInTheDocument();
    expect(channelImage).toHaveAttribute("src", mockChannel.image);
    expect(channelImage).toHaveAttribute("alt", mockChannel.name);
  });
});
