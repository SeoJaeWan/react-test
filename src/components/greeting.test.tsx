import { beforeEach, describe, Mock, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import Greeting from "./greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting Component", () => {
  it("should render correctly", () => {
    const { getByText } = render(<Greeting name={"Seo"} />);

    expect(getByText("Seo")).toBeInTheDocument();
  });

  //
  it("should increment when button click", async () => {
    const { getByText } = render(<Greeting name={"Seo"} />);

    expect(getByText("Count : 0")).toBeInTheDocument();
    await userEvent.click(getByText("+"));

    expect(getByText("Count : 1")).toBeInTheDocument();
  });

  it("should decrement when button click", async () => {
    const { getByText } = render(<Greeting name={"Seo"} />);

    expect(getByText("Count : 0")).toBeInTheDocument();
    await userEvent.click(getByText("-"));

    expect(getByText("Count : -1")).toBeInTheDocument();
  });

  it("should fetch mocking user data", async () => {
    const mockUser = {
      name: "Seo",
      email: "sjw7324@gmail.com",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockUser) })
    ) as Mock;

    const { getByText, queryByText } = render(
      <Greeting name={"Seo"} userId={1} />
    );

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("sjw7324@gmail.com")).toBeInTheDocument();
    });

    expect(queryByText("Loading...")).not.toBeInTheDocument();

    vi.clearAllMocks();
  });

  it("should render snapshot", () => {
    const { asFragment } = render(<Greeting name={"Bab"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
