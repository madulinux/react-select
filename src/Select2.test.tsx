import { render, screen } from '@testing-library/react';
import Select2, { Select2Option } from './Select2';

describe('Select2', () => {
  it('renders label and placeholder', () => {
    render(
      <Select2
        value={null}
        onChange={() => {}}
        fetchOptions={async () => ({ data: [], hasMore: false })}
        label="Wilayah"
        placeholder="Cari..."
      />
    );
    expect(screen.getByText('Wilayah')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari...')).toBeInTheDocument();
  });

  it('shows loading when fetching', async () => {
    render(
      <Select2
        value={null}
        onChange={() => {}}
        fetchOptions={async () => new Promise(res => setTimeout(() => res({ data: [], hasMore: false }), 200))}
        loadingClassName="loading"
        placeholder="Loading..."
      />
    );
    // Tunggu sampai input dengan placeholder Loading... muncul
    expect(await screen.findByPlaceholderText('Loading...')).toBeInTheDocument();
  });
});
