import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

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
            import('./pages/npc/npc.component').then(m => m.NpcComponent)
    },
    {
        path: 'spells',
        loadComponent: () =>
            import('./pages/spells/spells.component').then(m => m.SpellsComponent)
    },
];