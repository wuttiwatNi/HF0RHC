import { Component } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = ['data']
  dataSource = new MatTableDataSource<String>()

  url = 'https://api.publicapis.org/categories'

  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe((res) => {
      this.dataSource.data = res as String[]
    })
  }

  applyFilter(event: Event) {
    this.dataSource.filterPredicate = (
      data: String,
      filter: string
    ): boolean => {
      return data.trim().toLowerCase().includes(filter)
    }

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
