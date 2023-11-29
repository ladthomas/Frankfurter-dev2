# Frankfurter

## À propos

Créer un convertisseur de monnaie en utilisant l'api Frankfurter.
L'utilisateur pourra choisir la devise dans laquelle il souhaite convertir le montant qu'il aura entré dans la
devise de son choix, ou convertir le montant indiqué dans toutes les devises disponibles.
## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 📚 [Documentation](#documentation)

## Prérequis

- HTML
- CSS
- JS

## Documentation


Interface

Vous devez créer un formulaire qui permet de rentrer le montant à convertir, la devise de base et la devise
dans laquelle convertir le montant.
La liste des devises disponibles dépend de l'api Frankfurter, et doit être récupéré dynamiquement via l'api.

Frankfurter API

Vous devez utiliser les deux endpoints de l'api suivants :
https://www.frankfurter.app/docs/#currencies pour récupérer la liste des devises disponibles
https://www.frankfurter.app/docs/#conversion pour convertir un montant dans les ou la devise choisie

Contraintes techniques

Les résultats de conversion doivent être formatés en français
Vous devrez bien évidemment gérer tous les cas d'erreurs qui pourraient se présenter à vous :
Problème de l'API
Tentative de conversion d'un montant d'une devise à la même devise
Tentative de conversion d'un montant nul ou négatif

