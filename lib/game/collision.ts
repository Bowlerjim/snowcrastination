import { Snowball } from './entities/Snowball'
import { Snowflake } from './entities/Snowflake'

export function checkCollision(snowball: Snowball, snowflake: Snowflake): boolean {
  const dx = snowball.x - snowflake.x
  const dy = snowball.y - snowflake.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  return distance < snowball.radius + snowflake.radius
}
