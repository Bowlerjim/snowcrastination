import { NextRequest, NextResponse } from 'next/server'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: 'Missing latitude or longitude' },
        { status: 400 }
      )
    }

    if (!OPENWEATHER_API_KEY) {
      // Return default message if API key not configured
      return NextResponse.json({
        success: true,
        isSnowing: false,
        snowInForecast: false,
        message: '❄️ Get ready to defend your cabin!',
      })
    }

    // Call OpenWeather API for current weather
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    )

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weatherData = await weatherResponse.json()

    // Check for snow in current conditions
    const isSnowing = weatherData.weather.some((w: any) =>
      ['snow'].includes(w.main.toLowerCase())
    )

    // Call OpenWeather API for forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    )

    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data')
    }

    const forecastData = await forecastResponse.json()

    // Check for snow in next 24 hours
    const nextDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const snowInForecast = forecastData.list.some((forecast: any) => {
      const forecastTime = new Date(forecast.dt * 1000)
      return (
        forecastTime <= nextDay &&
        forecast.weather.some((w: any) => ['snow'].includes(w.main.toLowerCase()))
      )
    })

    // Generate message
    let message = '❄️ Get ready to defend your cabin!'
    if (isSnowing) {
      message = '🎉 GOOD NEWS SNOW DAY'
    } else if (snowInForecast) {
      message = '⚠️ SNOW IN THE FORECAST, GET READY TO CHILL'
    }

    return NextResponse.json({
      success: true,
      isSnowing,
      snowInForecast,
      message,
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    })
  } catch (error) {
    console.error('Weather API error:', error)

    // Return default message on error
    return NextResponse.json({
      success: true,
      isSnowing: false,
      snowInForecast: false,
      message: '❄️ Get ready to defend your cabin!',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
