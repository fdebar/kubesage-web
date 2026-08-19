import { useMutation } from '@tanstack/react-query';
import { testService, type SettingsService } from '@/services/settings.service';

export function useSettingsServiceTest() {
  return useMutation({
    mutationFn: (service: SettingsService) => testService(service),
  });
}
