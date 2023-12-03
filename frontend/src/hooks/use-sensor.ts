'use client';

import useSWR from 'swr';

import axios from 'axios';

import { sensorGETURL } from '@/utils/thingspeak-api';

import SensorData from '@/interfaces/sensor-data';

const fetcher = async (url: string) => {
  const res = await axios.get(url);

  return res.data;
};

export default function useSensor() {
  const { data, error, isLoading } = useSWR<SensorData | null, Error>(
    sensorGETURL,
    fetcher
  );

  return { data, error, isLoading };
}
