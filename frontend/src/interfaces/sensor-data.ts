export default interface SensorData {
  channel: {
    id: number;
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    field1: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;
  };
  feeds: [
    {
      created_at: string;
      entry_id: number;
      field1: string;
    }
  ];
}
