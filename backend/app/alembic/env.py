# from logging.config import fileConfig
# from sqlalchemy import engine_from_config, pool
# from sqlalchemy.engine import Connection
# from alembic import context
# import asyncio
# from sqlmodel import SQLModel 

# # --- CRITICAL APPLICATION IMPORTS ---
# # 1. Import the synchronous database URL from your application's utils
# from app.utils.db import SYNC_DATABASE_URL 
# # 2. Import a model to ensure the metadata is loaded
# from app.models.user_model import User     

# # This is the target metadata that Alembic will inspect (SQLModel Metadata)
# target_metadata = SQLModel.metadata

# # this is the Alembic Config object, which provides access to the values within the .ini file
# config = context.config

# # Interpret the config file for Python logging.
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# def run_migrations_offline() -> None:
#     """Run migrations in 'offline' mode (for generating scripts without a DB connection)."""
#     # Use the imported SYNC URL directly, bypassing the need for config file lookup for the URL
#     url = SYNC_DATABASE_URL 
#     context.configure(
#         url=url,
#         target_metadata=target_metadata,
#         literal_binds=True,
#         dialect_opts={"paramstyle": "named"},
#     )
#     with context.begin_transaction():
#         context.run_migrations()

# def do_run_migrations(connection: Connection) -> None:
#     """Configures and runs the migrations against the provided DB connection."""
#     context.configure(connection=connection, target_metadata=target_metadata)
#     with context.begin_transaction():
#         context.run_migrations()

# # --- ONLINE MODE (Fixes the KeyError: 'url' crash) ---
# async def run_async_migrations() -> None:
#     """Run migrations in 'online' mode for database inspection."""
    
#     # We construct the connectable manually using the SYNC URL for Alembic's introspection.
#     # This avoids the 'KeyError: url' crash by passing the URL explicitly.
#     connectable = engine_from_config(
#         config.get_section(config.config_ini_section, {}),
#         prefix="sqlalchemy.",
#         # Pass the URL explicitly for SQLAlchemy to use sync mode for introspection
#         url=SYNC_DATABASE_URL, 
#         poolclass=pool.NullPool,
#     )

#     with connectable.connect() as connection:
#         do_run_migrations(connection)

# def run_migrations_online() -> None:
#     """Run migrations in 'online' mode."""
#     # We call the sync connection function which handles the actual migration process.
#     asyncio.run(run_async_migrations())

# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()

from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from sqlalchemy.engine import Connection
from alembic import context
import asyncio
from sqlmodel import SQLModel 

# --- CRITICAL APPLICATION IMPORTS ---
# 1. Import the synchronous database URL from your application's utils
from app.utils.db import SYNC_DATABASE_URL 

# --- IMPORT ALL MODELS HERE ---
# Alembic needs to see these to generate tables.
# If you add more models later, import them here!
from app.models.user_model import User     
from app.models.document_model import Document
from app.models.study_plan_model import StudyPlan

# This is the target metadata that Alembic will inspect (SQLModel Metadata)
target_metadata = SQLModel.metadata

# this is the Alembic Config object, which provides access to the values within the .ini file
config = context.config

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode (for generating scripts without a DB connection)."""
    # Use the imported SYNC URL directly, bypassing the need for config file lookup for the URL
    url = SYNC_DATABASE_URL 
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection: Connection) -> None:
    """Configures and runs the migrations against the provided DB connection."""
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()

# --- ONLINE MODE (Fixes the KeyError: 'url' crash) ---
async def run_async_migrations() -> None:
    """Run migrations in 'online' mode for database inspection."""
    
    # We construct the connectable manually using the SYNC URL for Alembic's introspection.
    # This avoids the 'KeyError: url' crash by passing the URL explicitly.
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        # Pass the URL explicitly for SQLAlchemy to use sync mode for introspection
        url=SYNC_DATABASE_URL, 
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        do_run_migrations(connection)

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    # We call the sync connection function which handles the actual migration process.
    asyncio.run(run_async_migrations())

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()