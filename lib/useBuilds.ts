import { useState, useEffect } from "react";
import { Building, BuildingType, Player, Sizes } from "./types";
import supabase from "@/utils/supabase/supabase";

export function useBuilds(){
    const types = useBuildingTypes()
    const sizes = useSizes()
    return {
        types,
        sizes,
        isLoading: types.loading || sizes.loading
    }
}

function useBuildingTypes() {
    const [types, setTypes] = useState<BuildingType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchBuildings = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("building-type")
            .select("*")
          if (!isMounted) return;
  
          if (error) {
            throw error;
          }
  
          setTypes(data || []);
        } catch (err) {
          if (isMounted) {
            setError(err as Error);
            setTypes([]);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchBuildings();
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    return {
      types,
      loading,
      error,
      isEmpty: types.length === 0,
      count: types.length,
    };
  }

  function useSizes() {
    const [sizes, setSizes] = useState<Sizes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchBuildings = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("building-type")
            .select("*")
          if (!isMounted) return;
  
          if (error) {
            throw error;
          }
  
          setSizes(data || []);
        } catch (err) {
          if (isMounted) {
            setError(err as Error);
            setSizes([]);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchBuildings();
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    return {
      sizes,
      loading,
      error,
      isEmpty: sizes.length === 0,
      count: sizes.length,
    };
  }