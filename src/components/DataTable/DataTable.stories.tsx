import { DataTable, type Column } from './DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', active: true },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Viewer', active: false },
];

const columns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

export default {
  title: 'Components/DataTable',
  component: DataTable,
};

export const Basic = () => (
  <DataTable columns={columns} data={users} rowKey={(user) => user.id} />
);

export const WithCaption = () => (
  <DataTable
    columns={columns}
    data={users}
    rowKey={(user) => user.id}
    caption="Team members"
  />
);

export const WithCustomCell = () => (
  <DataTable
    columns={[
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'active',
        header: 'Status',
        render: (user) => (user.active ? 'Active' : 'Inactive'),
      },
    ]}
    data={users}
    rowKey={(user) => user.id}
  />
);

export const Empty = () => (
  <DataTable
    columns={columns}
    data={[]}
    rowKey={(user) => user.id}
    emptyMessage="No team members yet"
  />
);
