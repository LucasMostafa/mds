import { Component } from '@angular/core';
import { BentoGrid } from '../../components/bento-grid/bento-grid';
import { Navbar } from '../../../../core/components/navbar/navbar';
import { WhatWeDo } from '../../components/what-we-do/what-we-do';
import { Studio } from '../../components/studio/studio';
import { Contact } from '../../components/contact/contact';
@Component({
  selector: 'app-home-view',
  imports: [BentoGrid, Navbar, WhatWeDo, Studio, Contact],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class HomeView {

}

