import { Component, EventEmitter, Output, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class DeleteButtonComponent {
  @Input()
  public element: any;

  /* EMIT ELEMENT FOR DELETE */
  @Output()
  public deleteElement: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  /* DELETE ELEMENT*/
  public delete() {
    this.openDialog(this.element);
  }

  /* OPEN DIALOG TO CONFIRM DELETE ELEMENT */
  private openDialog(element): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteElement.emit(element);
      }
    });
  }
}

@Component({
  selector: 'confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Remover Registro</h2>
    <mat-dialog-content>
      <p>
        Deseja remover este registro?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Não</button>
      <button mat-button [mat-dialog-close]="true">Sim</button>
    </mat-dialog-actions>
`
})
export class ConfirmationDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
