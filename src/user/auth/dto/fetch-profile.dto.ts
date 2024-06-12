import { Profile } from '../profile.entity';

export class FetchProfileRequestDto {
  headers: Headers & {
    authorization?: string;
  };
  user?: Profile;
}

export class FetchProfileResponseDto extends Profile {
  id: string;
  email: string;
  name: string;
}
