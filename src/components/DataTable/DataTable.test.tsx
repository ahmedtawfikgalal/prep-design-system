import { render, screen, within } from '@testing-library/react';
import { DataTable, type Column } from './DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', active: true },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', active: false },
];

const columns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
];

test('renders a column header for each column', () => {
  render(<DataTable columns={columns} data={users} rowKey={(u) => u.id} />);
  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Email' })).toBeInTheDocument();
});

test('renders each cell value from the data', () => {
  render(<DataTable columns={columns} data={users} rowKey={(u) => u.id} />);
  expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  expect(screen.getByText('alan@example.com')).toBeInTheDocument();
});

test('renders one body row per data item', () => {
  render(<DataTable columns={columns} data={users} rowKey={(u) => u.id} />);
  const [, ...bodyRows] = screen.getAllByRole('row'); // first row is the header
  expect(bodyRows).toHaveLength(users.length);
});

test('uses a custom render function for a column when provided', () => {
  const withStatus: Column<User>[] = [
    { key: 'name', header: 'Name' },
    {
      key: 'active',
      header: 'Status',
      render: (user) => <span>{user.active ? 'Active' : 'Inactive'}</span>,
    },
  ];
  render(<DataTable columns={withStatus} data={users} rowKey={(u) => u.id} />);
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Inactive')).toBeInTheDocument();
});

test('renders a caption when provided', () => {
  render(
    <DataTable
      columns={columns}
      data={users}
      rowKey={(u) => u.id}
      caption="Team members"
    />,
  );
  expect(screen.getByText('Team members')).toBeInTheDocument();
});

test('shows the empty message spanning all columns when there is no data', () => {
  render(
    <DataTable
      columns={columns}
      data={[]}
      rowKey={(u) => u.id}
      emptyMessage="No team members yet"
    />,
  );
  const cell = screen.getByText('No team members yet');
  expect(cell).toBeInTheDocument();
  expect(cell).toHaveAttribute('colspan', String(columns.length));
});

test('marks header cells with a column scope for assistive tech', () => {
  render(<DataTable columns={columns} data={users} rowKey={(u) => u.id} />);
  for (const header of screen.getAllByRole('columnheader')) {
    expect(header).toHaveAttribute('scope', 'col');
  }
});

test('renders custom content only in the intended row', () => {
  render(<DataTable columns={columns} data={users} rowKey={(u) => u.id} />);
  const adaRow = screen.getByText('Ada Lovelace').closest('tr')!;
  expect(within(adaRow).getByText('ada@example.com')).toBeInTheDocument();
  expect(within(adaRow).queryByText('alan@example.com')).not.toBeInTheDocument();
});
