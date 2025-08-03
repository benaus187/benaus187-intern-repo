# Terminal Knowledge 
1. Which terminal client did you choose? Why?
    On my Mac, I use iTerm2 (Zsh). iTerm2 is more capable and configurable than the conventional Terminal program. It helps such features as div window, inline serach, and excellent theme/font manipulations that facilitate the development process and make it more pleasing to the eye.
2. What customizations ( if any ) did you make?
    I made the following customizations:
    - Switched to the agnoster theme in my .zshrc file:
    Command : ZSH_THEME="agnoster"
    - Installed Powerline fonts so that the agnoster theme display correctly
    Command : git clone https://github.com/powerline/fonts.git --depth=1
            cd fonts
            ./install.sh
            cd ..
            rm -rf fonts
    - Changed the font in iTerm2 setting to DejaVu Sans Mono for Powerline for both normal and non-ASCII fonts.
    - Changed iTerm2 color scheme to make text more visible against the dark background.
3. What was the most useful command you learned today?
    The most useful command I practiced today was:
    source ~/.zshrc
    This command reloads the .zshrc file without restarting the terminal, which saved me a lot of time when testing theme and alias changes.
Added a vague commit example.
