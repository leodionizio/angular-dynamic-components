import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class DataTableComponent implements AfterViewInit {
  public tableData: any[] = [];
  public displayedColumns: any[] = [];
  public columns: any[] = [];
  private columnNames: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  @ViewChild(MatSort)
  public sort: MatSort;

  /* SET COLUMNS NAMES */
  @Input()
  set setColumns(columns: string[]) {
    this.columnNames = columns;
  }

  /* SET DATA TO DATATABLE */
  @Input()
  set setData(data: any[]) {
    if (data.length) {
      Object.keys(data[0]).map((key, index) => {
        this.displayedColumns.push(key);

        this.columns.push({ key: key, text: this.columnNames[index] });
      });
    }

    this.tableData = data;
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  /* SHOW ACTIONS INTO DATATABLE */
  @Input()
  set actions(value: boolean) {
    if (value) {
      this.displayedColumns.push('actions');
    }
  }

  /* SET HEIGHT FORM IN PX */
  @Input()
  public height = 600;

  /* EMIT ELEMENT FOR EDIT */
  @Output()
  public editElement: EventEmitter<any> = new EventEmitter();

  /* EMIT ELEMENT FOR DELETE */
  @Output()
  public deleteElement: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  /* INIT PAGINATED AND SORTED */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* APPLY FILTER */
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /* EDIT ELEMENT */
  public edit(element: any) {
    this.editElement.emit(element);
  }

  /* DELETE ELEMENT*/
  public delete(element: any) {
    // this.deleteElement;
    this.openDialog(element);
  }

  /* OPEN DIALOG TO CONFIRM DELETE ELEMENT */
  private openDialog(element): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
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
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
