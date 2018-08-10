import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  public dataTableList = [
    {
      id: '12312',
      name: 'Leonardo Dionizio',
      email: 'leonardo.dionizio@s2it.com.br',
      bornDate: '07/06/1995'
    },
    {
      id: '12312',
      name: 'Leonardo Dionizio',
      email: 'leonardo.dionizio@s2it.com.br',
      bornDate: '07/06/1995'
    }
  ];

  public columnsName = ['ID', 'Nome', 'Email', 'Data de Nascimento'];

  public element = {
    name: 'Leonardo Dionizio',
    email: 'leonardo.dionizio@s2it.com.br',
    bornDate: '07/06/1995'
  };

  constructor() {}

  ngOnInit() {}
}
