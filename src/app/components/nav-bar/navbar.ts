import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CButton } from "../ui/c-button/c-button";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavBar {

}
