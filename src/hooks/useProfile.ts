import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile, ProfileUpdate } from '@/types/profile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        // Profile might not exist yet for existing users
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', user?.id], data);
      toast({
        title: 'Profil aktualisiert',
        description: 'Deine Änderungen wurden gespeichert.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fehler',
        description: 'Profil konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
      console.error('Profile update error:', error);
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
  };
}
