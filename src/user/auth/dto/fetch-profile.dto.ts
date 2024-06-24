import { Profile } from '../profile.entity';

export class RequestWithAuth {
  headers: Headers & {
    authorization?: string;
  };
  user?: Profile;
}

export class FetchProfileRequestDto extends RequestWithAuth {}

export class FetchProfileResponseDto extends Profile {
  id: string;
  email: string;
  name: string;
}
