import { Routes } from '@angular/router';
import { HomeComponent } from './tools/home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'npc',
        loadComponent: () =>
            import('./tools/npc/npc.component').then(m => m.NpcComponent)
    },
    {
        path: 'spells',
        loadComponent: () =>
            import('./tools/spells/spells.component').then(m => m.SpellsComponent)
    },
];
