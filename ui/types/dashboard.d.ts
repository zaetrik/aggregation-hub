interface Dashboard {
  id?: string;
  name: string; // Custom dashboard name
  moduleId?: string;
  components: DashboardComponent[];
}

interface DashboardComponent {
  name: string; // React component name, e.g. LineChart or RadialBarChart
  chartHeading?: string;
  chartSubHeading?: string;
  searchQueries: DashboardSearchQuery[]; // One or more search queries; data will be merged into one array
}

interface DashboardSearchQuery {
  moduleIds: string[]; // Array of moduleIds where data will be queried from
  size: number; // Number of search results that should be returned from store
  query: {
    [field: string]: string;
  };
}
