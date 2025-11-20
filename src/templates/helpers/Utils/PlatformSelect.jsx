/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

export const PlatformSelect = () => {
  const platforms = [
    'PS5', 'PS4', 'PS3', 'PS2', 'PS1', 'PSVita', 'PSP', 'Nintendo Switch 2', 'Nintendo Switch', 'WiiU', 
    'Wii', 'GameCube', 'Nintendo 64', 'Nintendo 3DS', 'Nintendo DS', 
    'Game Boy Advance', 'Game Boy Color', 'Game Boy', 'Xbox Series X-S', 'Xbox One', 
    'Xbox 360', 'Xbox', 'PC', 'SNES', 'NES', 'SEGA MegaDrive'
  ]

  return (
    <select name="plataforma" id="plataforma" className="p-2 border rounded">
      {platforms.map(platform => (
        <option key={platform} value={platform}>{platform}</option>
      ))}
    </select>
  )
}

