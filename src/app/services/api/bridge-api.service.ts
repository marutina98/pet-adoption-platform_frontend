import { Injectable, inject } from '@angular/core';

// Interfaces

import { BridgeAPI } from './../../interfaces/api/bridge-api';

// Services

import { RealApiService } from './real-api.service';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class BridgeApiService {

  private real: RealApiService = inject(RealApiService);
  private mock: MockApiService = inject(MockApiService);

  public chosenAPI: BridgeAPI = this.real;

}
