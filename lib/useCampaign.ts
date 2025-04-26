import { useState, useEffect } from "react";
import { Building, Player } from "./types";
import supabase from "@/utils/supabase/supabase";

export function useCampaign(campID: string){
    const buildings = useBuildings(campID)
    const party = useParty(campID)

    return {
        buildings,
        party,
        isLoading: buildings.loading || party.loading
    }
}

export function useBuildings(campID: string) {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchBuildings = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("building")
            .select("*")
            .eq("campaignID", campID);
          console.log(data)
          if (!isMounted) return;
  
          if (error) {
            throw error;
          }
  
          setBuildings(data || []);
        } catch (err) {
          if (isMounted) {
            setError(err as Error);
            setBuildings([]);
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
    }, [campID]);
  
    // Add realtime for building
    useEffect(() => {
      if (!campID) return;
  
      const channel = supabase
        .channel(`building:${campID}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'building',
            filter: `campaignID=eq.${campID}`
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setBuildings(prev => [...prev, payload.new as Building]);
            } else if (payload.eventType === 'UPDATE') {
              setBuildings(prev => prev.map(p => 
                p.id === payload.new.id ? payload.new as Building : p
              ));
            } else if (payload.eventType === 'DELETE') {
              setBuildings(prev => prev.filter(p => p.id !== payload.old.id));
            }
          }
        )
        .subscribe();
  
      return () => {
        supabase.removeChannel(channel);
      };
    }, [campID]);
  
    return {
      buildings,
      loading,
      error,
      isEmpty: buildings.length === 0,
      count: buildings.length,
    };
  }

export function useParty(campID: string) {
  const [party, setParty] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchParty = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("player")
          .select("*")
          .eq("campaignID", campID);

        if (!isMounted) return;

        if (error) {
          throw error;
        }

        setParty(data || []);
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setParty([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchParty();

    return () => {
      isMounted = false;
    };
  }, [campID]);

  // Add realtime updates
  useEffect(() => {
    if (!campID) return;

    const channel = supabase
      .channel(`players:${campID}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player',
          filter: `campaignID=eq.${campID}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setParty(prev => [...prev, payload.new as Player]);
          } else if (payload.eventType === 'UPDATE') {
            setParty(prev => prev.map(p => 
              p.id === payload.new.id ? payload.new as Player : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setParty(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [campID]);

  return {
    party,
    loading,
    error,
    isEmpty: party.length === 0,
    count: party.length,
  };
}