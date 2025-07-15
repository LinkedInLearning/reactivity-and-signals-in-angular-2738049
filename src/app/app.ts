import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './side-nav/side-nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, SideNav],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
