Writing a Progressive Web App from scratch (Part 1)
===================================================

Recently, the app that I usually use for making my grocery list stopped being useful for us. And it
is not that it does not work anymore or somehow it broke down. The part that is not working for us anymore is the fact that in the
store where we do our shopping there is literally no internet signal. So you fill out your shopping list at home and everything works well,
but as soon as you arrive to the supermarket and open the app, there is no way for you to see your list because the app is trying
to reach an unreachable server.

Combining that with the facts that I haven't done any Angular 4 application and I haven't done anything mobile first made me think in
go ahead and write my own grocery list application instead of just finding one that works offline too (which I'm sure there should be tons of them). 

This application would have to work on both IOs and Android, so I started glancing at how to publish apps in Apple's and Android's App Stores.
I was surprised at the yearly cost of it and was trying to convince myself that it was worth it even if it was only for one app, but fortunately
I didn't have to spend much time thinking on it. While doing some research I quickly landed in Progressive Web Apps:

*A Progressive Web App uses modern web capabilities to deliver an app-like user experience.
They are installable and live on the user's home screen, without the need for an app store*

Voilá!! Seemed exactly what I needed! So, I will be writing a series of posts about the process of writing that PWA from scratch.

## The Problem

Luckily for me, the problem is very simple:

*Write a PWA that allows users to create and share groceries lists*

I'm not trying to write the next one million users app, I just want to have a groceries list PWA for me and learn something
 in the process of doing so. So, to my requirements.
 
### MVP Requirements

For the MVP, users can:

* Have only one list
* Add items to the list
* Mark items as completed
* Edit items
* Delete items
* Archive all completed items

Additionally, it has the following characteristics:

* Only a small list of predefined users can access it (so it has some sort of login)
* All those users have access to the same list
* It works offline and sync once connection is available

I was thinking that, potentially, any user can come to the PWA and use it as a guest, which basically means one list, no sync.
Only logged in users would have the sync functionality. That way I can show the PWA to people without having to add them to my
initial (tiny) list of users.

### Extended Scenarios

For future versions, users can:

* Provide feedback through the PWA
* Select among different themes
* Create sublists or categories, so they can divide by supermarket, for example
* Create several lists
* Decide which lists are shared, and with whom
* Add items using voice
* Add items using voice in a second language (Spanish in my case)
* Attach a picture to an item
* Add notes or description to items

Also, the following functionality could be added as well

* Items are deleted automatically some time after marked completed
* More sophisticated, secure and robust login 

Cool! That list looks good. So, I will probably divide my work in big chunks, to not get overwhelmed.

## The Plan

I think that the big steps I will follow are:

1 Define the problem (this blog post)

2 Research

3 Design

4 POC: Wire everything with stubs

5 MVP
 
6 Tests

After that, I will probably start using the PWA so I can come up with feedback and required improvements, and then start a second round.

This looks good! I'm thrilled about it! I can't wait to start :)