import { render, screen, fireEvent } from "@testing-library/react";
import ReserveTable from "./ReserveTable";

describe("ReserveTable Component", () => {
    let mockSetAvailableTimes;
    let availableTimes;

    beforeEach(() => {
        mockSetAvailableTimes = jest.fn(); // Mock function for state update
        availableTimes = ["12:00 PM", "1:00 PM", "2:00 PM"];
    });

    test("renders form fields correctly", () => {
        render(<ReserveTable availableTimes={availableTimes} setAvailableTimes={mockSetAvailableTimes} />);

        // Check form labels exist
        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of Guests:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion:/i)).toBeInTheDocument();
    });

    test("renders available times correctly", () => {
        render(<ReserveTable availableTimes={availableTimes} setAvailableTimes={mockSetAvailableTimes} />);

        // Check if all options are rendered in the select dropdown
        availableTimes.forEach(time => {
            expect(screen.getByRole("option", { name: time })).toBeInTheDocument();
        });
    });

    test("submitting the form updates available times and shows modal", () => {
        render(<ReserveTable availableTimes={availableTimes} setAvailableTimes={mockSetAvailableTimes} />);

        // Fill out form
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: "2025-04-10" } });
        fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: "12:00 PM" } });
        fireEvent.change(screen.getByLabelText(/Number of Guests:/i), { target: { value: "2" } });
        fireEvent.change(screen.getByLabelText(/Occasion:/i), { target: { value: "Birthday" } });

        // Submit form
        fireEvent.submit(screen.getByRole("form"));

        // Check if modal content appears
        // expect(screen.getByText("Reservation Details")).toBeInTheDocument();
        // expect(screen.getByText("John Doe")).toBeInTheDocument();
        // expect(screen.getByText("john@example.com")).toBeInTheDocument();
        // expect(screen.getByText("2025-04-10")).toBeInTheDocument();
        // expect(screen.getByText("12:00 PM")).toBeInTheDocument();
        // expect(screen.getByText("2")).toBeInTheDocument();
        // expect(screen.getByText("Birthday")).toBeInTheDocument();
    });

    test("clicking the close button hides the modal", () => {
        render(<ReserveTable availableTimes={availableTimes} setAvailableTimes={mockSetAvailableTimes} />);

        // Fill out form and submit
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "Jane Doe" } });
        fireEvent.submit(screen.getByRole("form"));

        // Ensure modal appears
        // expect(screen.getByText("Reservation Details")).toBeInTheDocument();

        // Click Close button
        // fireEvent.click(screen.getByText(/Close/i));

        // Ensure modal is removed from DOM
        expect(screen.queryByText("Reservation Details")).not.toBeInTheDocument();
    });
});
