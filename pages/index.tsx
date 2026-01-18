import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FILTER_OPTIONS, HERO_BACKGROUND } from '@/constants';
import { PropertyProps } from '@/interfaces';
import Pill from '@/components/common/Pill';
import PropertyCard from '@/components/property/PropertyCard';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
}
