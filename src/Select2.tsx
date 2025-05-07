// Standalone Select2 component for npm package
import React, { useState, useEffect } from 'react';

export type Select2Option = {
  id: string | number;
  label: string;
  [key: string]: any;
};

export type Select2Props = {
  value: Select2Option | Select2Option[] | null;
  onChange: (val: Select2Option | Select2Option[] | null) => void;
  fetchOptions: (params: { search: string }) => Promise<{ data: Select2Option[]; hasMore: boolean }>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  renderOption?: (item: Select2Option) => React.ReactNode;
  isMulti?: boolean;
  /** Styling props */
  className?: string; // root
  inputClassName?: string; // input box
  dropdownClassName?: string; // dropdown menu
  optionClassName?: string; // option item
  selectedOptionClassName?: string; // selected option item
  loadingClassName?: string; // loading text
  noDataClassName?: string; // no data text
};

const Select2: React.FC<Select2Props> = ({
  value,
  onChange,
  fetchOptions,
  placeholder = '',
  label,
  disabled = false,
  renderOption,
  isMulti = false,
  className = '',
  inputClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  selectedOptionClassName = '',
  loadingClassName = '',
  noDataClassName = '',
}) => {
  const [options, setOptions] = useState<Select2Option[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOptions({ search }).then(res => {
      setOptions(res.data);
      setLoading(false);
    });
  }, [search, fetchOptions]);

  return (
    <div className={className} style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={isMulti ? '' : (value as Select2Option)?.label || ''}
          placeholder={placeholder}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 200)}
          onChange={e => setSearch(e.target.value)}
          disabled={disabled}
          className={inputClassName}
          style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        {show && (
          <div
            className={dropdownClassName}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #eee', zIndex: 10, maxHeight: 200, overflowY: 'auto' }}
          >
            {loading ? (
              <div className={loadingClassName} style={{ padding: 8 }}>Loading...</div>
            ) : options.length === 0 ? (
              <div className={noDataClassName} style={{ padding: 8, color: '#888' }}>Tidak ada data</div>
            ) : (
              options.map(item => {
                const isSelected = value && !isMulti && (value as Select2Option).id === item.id;
                return (
                  <div
                    key={item.id}
                    className={isSelected ? `${optionClassName} ${selectedOptionClassName}` : optionClassName}
                    style={{ padding: 8, cursor: 'pointer', background: isSelected ? '#eef' : undefined }}
                    onMouseDown={() => {
                      onChange(item);
                      setShow(false);
                    }}
                  >
                    {renderOption ? renderOption(item) : item.label}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select2;
