import { VehiclePickingController } from '@/components/VehiclePickingController';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';

vi.mock('@/components/util.ts', () => ({
  fetchMakes: vi.fn(() => Promise.resolve(['Toyota', 'Honda', 'Ford'])),
  fetchModels: vi.fn(() => Promise.resolve(['Camry', 'Civic', 'Mustang'])),
  fetchSubModels: vi.fn(() => Promise.resolve(['XLE', 'Sport', 'GT'])),
  fetchDetails: vi.fn(() =>
    Promise.resolve({
      availableTransmissions: ['Automatic', 'Manual'],
      availableFuels: ['Gasoline', 'Diesel'],
      engineSizeOptions: ['2.5L', '3.0L'],
    })
  ),
}));

describe('VehiclePickingController', () => {
  it('navigates through the entire flow', async () => {
    render(<VehiclePickingController />);

    expect(screen.getByText('Please Select Make')).toBeVisible();
    const selectMakeButton = await screen.findByRole('button', {
      name: 'Select a make',
    });
    await userEvent.click(selectMakeButton);
    await userEvent.click(screen.getByText('Toyota'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Select Model')).toBeVisible();
    const selectModelButton = await screen.findByRole('button', {
      name: 'Select a model',
    });
    await userEvent.click(selectModelButton);
    await userEvent.click(screen.getByText('Camry'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Select SubModel')).toBeVisible();
    const selectSubModelButton = await screen.findByRole('button', {
      name: 'Select a submodel',
    });
    await userEvent.click(selectSubModelButton);
    await userEvent.click(screen.getByText('XLE'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Select Vehicle Details')).toBeInTheDocument();
    const selectTransmissionButton = await screen.findByRole('button', {
      name: 'Select a transmission',
    });
    await userEvent.click(selectTransmissionButton);
    await userEvent.click(screen.getByText('Automatic'));
    const selectFuelButton = await screen.findByRole('button', {
      name: 'Select a fuel type',
    });
    await userEvent.click(selectFuelButton);
    await userEvent.click(screen.getByText('Gasoline'));
    const selectEngineSizeButton = await screen.findByRole('button', {
      name: 'Select an engine size',
    });
    await userEvent.click(selectEngineSizeButton);
    await userEvent.click(screen.getByText('2.5L'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Summary')).toBeVisible();
    expect(screen.getByText('Toyota')).toBeVisible();
    expect(screen.getByText('Camry')).toBeVisible();
    expect(screen.getByText('XLE')).toBeVisible();
    expect(screen.getByText('Automatic')).toBeVisible();
    expect(screen.getByText('Gasoline')).toBeVisible();
    expect(screen.getByText('2.5L')).toBeVisible();
  });

  it('skips the submodel selection step and details step and not show skipped fields in the summary page', async () => {
    render(<VehiclePickingController />);

    expect(screen.getByText('Please Select Make')).toBeVisible();
    const selectMakeButton = await screen.findByRole('button', {
      name: 'Select a make',
    });
    await userEvent.click(selectMakeButton);
    await userEvent.click(screen.getByText('Toyota'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Select Model')).toBeVisible();
    const selectModelButton = await screen.findByRole('button', {
      name: 'Select a model',
    });
    await userEvent.click(selectModelButton);
    await userEvent.click(screen.getByText('Camry'));
    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Select SubModel')).toBeVisible();
    const skipButton = await screen.findByRole('button', {
      name: 'Skip',
    });
    await userEvent.click(skipButton);

    expect(screen.getByText('Select Vehicle Details')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Next'));

    expect(screen.queryByText('Summary')).toBeVisible();
    expect(screen.queryByText('Toyota')).toBeVisible();
    expect(screen.queryByText('Camry')).toBeVisible();
    expect(screen.queryByText('Submodel')).not.toBeInTheDocument();
    expect(screen.queryByText('Transmission')).not.toBeInTheDocument();
    expect(screen.queryByText('Fuel Type')).not.toBeInTheDocument();
    expect(screen.queryByText('Engine Size')).not.toBeInTheDocument();
  });
});
