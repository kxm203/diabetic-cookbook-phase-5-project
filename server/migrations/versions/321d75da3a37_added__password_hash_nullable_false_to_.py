"""added _password_hash nullable=False to User

Revision ID: 321d75da3a37
Revises: 874c4cc15546
Create Date: 2024-04-03 13:21:19.045002

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '321d75da3a37'
down_revision = '874c4cc15546'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
