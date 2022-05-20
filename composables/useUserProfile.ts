import type { Ref } from 'vue';
import type { Profile } from './../types/profile';

export const useUserProfile = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const { data: profile }: { data: Ref<Profile> } = await useAsyncData('profile', async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single();
    return data;
  });

  return profile;
};
