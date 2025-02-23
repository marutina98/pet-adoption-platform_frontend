import { Component, Inject, inject } from '@angular/core';

import { AnimalPicture } from './../../interfaces/animal-picture';

import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

const material = [MatDialogModule];

@Component({
  selector: 'app-card-pictures',
  standalone: true,
  imports: [...material],
  templateUrl: './card-pictures.component.html',
  styleUrl: './card-pictures.component.css'
})
export class CardPicturesComponent {

  public animalId: number = 0;
  public pictures: AnimalPicture[] = [];

  private matDialog: MatDialog = inject(MatDialog);
  private matDialogRef = inject(MatDialogRef<CardPicturesComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.animalId = this.data.animalId;
    this.pictures = this.data.pictures;
  }

  openConfirmationDialog(picture: AnimalPicture) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deletePicture(picture);
      await this.getPictures();
    });
  }

  async deletePicture(picture: AnimalPicture) {

    this.openSnackBar('Deleting Picture.');

    const response = await this.dataService.adminDeletePicture(picture.id);

    if (response.ok) {
      this.openSnackBar('Picture Successfully Deleted.');
    } else {
      this.openSnackBar('Picture Could Not Be Deleted.');
    }

  }

  async getPictures() {
    const response = await this.dataService.getAnimalPicturesByAnimalId(this.animalId);
    this.pictures = await response.json();
  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
