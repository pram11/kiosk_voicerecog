#pragma once

#include "App.xaml.g.h"



namespace winrt::kiosk_client::implementation
{
    struct App : AppT<App>
    {
        App() noexcept;
    };
} // namespace winrt::kiosk_client::implementation


